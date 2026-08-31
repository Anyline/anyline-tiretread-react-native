#!/bin/sh
#
# Downloads and verifies the Anyline Tire Tread SDK xcframework. Run by the
# podspec's prepare_command during `pod install`.
#
# Usage: sh fetch_anyline_sdk.sh <version> <sha256>

set -e

version="$1"
checksum="$2"

if [ -z "$version" ] || [ -z "$checksum" ]; then
  echo "usage: sh $0 <version> <sha256>" >&2
  exit 1
fi

framework="AnylineTireTreadSdk.xcframework"
stamp="$framework/.anyline-vendored-version"
expected="$version $checksum"

# The _spm_ archive holds the xcframework at its root.
url="https://ttr-sdk-ios.anyline.io/stable/$version/AnylineTireTreadSdk_spm_$version.zip"

# Keyed on version+checksum so an SDK bump cannot reuse a stale copy.
if [ -f "$stamp" ] && [ "$(cat "$stamp")" = "$expected" ]; then
  exit 0
fi

echo "Fetching $framework $version..."

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

curl -fL --proto '=https' --proto-redir '=https' --retry 3 -o "$tmp/sdk.zip" "$url"

actual="$(shasum -a 256 "$tmp/sdk.zip" | awk '{print $1}')"
if [ "$actual" != "$checksum" ]; then
  echo "error: checksum mismatch for $framework $version" >&2
  echo "  expected $checksum" >&2
  echo "  actual   $actual" >&2
  exit 1
fi

unzip -q "$tmp/sdk.zip" -d "$tmp/extracted"
if [ ! -d "$tmp/extracted/$framework" ]; then
  echo "error: $framework not found at the root of the downloaded archive" >&2
  exit 1
fi

# Swap in only after verifying and extracting, so a partial run leaves nothing.
rm -rf "$framework"
mv "$tmp/extracted/$framework" "$framework"
echo "$expected" > "$stamp"
