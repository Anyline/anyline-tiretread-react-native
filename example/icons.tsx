import React from 'react';
import Svg, { Circle, Path, SvgXml } from 'react-native-svg';

/**
 * Anyline tire glyphs and brand mark, rendered from inline SVG so a single
 * color prop tints them (fills use currentColor). Sources ship in the
 * ApiExplorer redesign handoff under assets/.
 */

const TIRE_SIDEWALL_XML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.27121 11.9998C4.27121 16.2853 7.77809 19.7593 12.104 19.7593C16.43 19.7593 19.9369 16.2853 19.9369 11.9998C19.9369 7.71441 16.43 4.24039 12.104 4.24039C7.77809 4.24039 4.27121 7.71441 4.27121 11.9998ZM18.0953 12.847C18.1868 12.3023 17.7306 11.8516 17.1784 11.8516H14.4178C14.1023 11.8516 13.8551 12.1128 13.757 12.4126C13.6578 12.7156 13.7041 13.0781 13.9634 13.2636L16.195 14.8603C16.6395 15.1784 17.2657 15.0834 17.515 14.5969C17.7972 14.0459 17.9929 13.4558 18.0953 12.847ZM13.5862 16.6897C13.7603 17.2175 13.4704 17.7945 12.9207 17.8768C12.3039 17.9693 11.6762 17.9693 11.0593 17.8768C10.5097 17.7945 10.2197 17.2175 10.3939 16.6897L11.2337 14.144C11.3348 13.8375 11.6672 13.6799 11.99 13.6799C12.3128 13.6799 12.6452 13.8375 12.7464 14.144L13.5862 16.6897ZM6.46512 14.5969C6.71436 15.0834 7.34058 15.1784 7.78513 14.8603L10.0167 13.2636C10.2759 13.0781 10.3223 12.7156 10.2231 12.4126C10.1249 12.1128 9.87777 11.8516 9.56225 11.8516L6.80173 11.8516C6.24945 11.8516 5.79327 12.3023 5.88482 12.847C5.98716 13.4558 6.18284 14.0459 6.46512 14.5969ZM7.80873 8.85967C7.35497 8.53499 7.24999 7.89455 7.65077 7.50635C8.0963 7.07481 8.60576 6.71211 9.16167 6.43078C9.65133 6.18297 10.2163 6.47528 10.3883 6.99643L11.2325 9.55531C11.3338 9.86232 11.1555 10.1872 10.8933 10.3763C10.6354 10.5623 10.2805 10.6283 10.0219 10.4433L7.80873 8.85967ZM14.8184 6.43078C14.3288 6.18297 13.7638 6.47528 13.5918 6.99643L12.7476 9.55531C12.6463 9.86232 12.8245 10.1872 13.0868 10.3763C13.3447 10.5623 13.6996 10.6283 13.9582 10.4433L16.1714 8.85967C16.6251 8.53499 16.7301 7.89455 16.3293 7.50635C15.8838 7.07481 15.3743 6.71211 14.8184 6.43078Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.208 12C23.208 18.0751 18.2366 23 12.104 23C5.97144 23 1 18.0751 1 12C1 5.92487 5.97144 1 12.104 1C18.2366 1 23.208 5.92487 23.208 12ZM20.8072 11.9998C20.8072 16.7614 16.9107 20.6215 12.104 20.6215C7.29743 20.6215 3.4009 16.7614 3.4009 11.9998C3.4009 7.23825 7.29743 3.37822 12.104 3.37822C16.9107 3.37822 20.8072 7.23825 20.8072 11.9998Z" fill="currentColor"></path>
</svg>`;

const TIRE_TREAD_XML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="16.942" y="1" width="2.50675" height="21.3073" fill="currentColor"></rect>
<path d="M13.3908 3.29785C13.6747 1.75455 14.0665 1.08274 16.1064 1V3.29785C15.3115 3.07835 14.696 3.07044 13.3908 3.29785Z" fill="currentColor"></path>
<path d="M13.3908 20.0093C13.6747 21.5526 14.0665 22.2244 16.1064 22.3071V20.4271C16.1064 20.2182 15.0401 19.8555 13.3908 20.0093Z" fill="currentColor"></path>
<path d="M16.1064 4.02044C15.3997 3.68252 14.7913 3.64658 13.3908 3.81062V5.80386C14.5008 5.76187 15.0924 5.81585 16.1064 6.01367V4.02044Z" fill="currentColor"></path>
<path d="M16.1064 6.73577C15.3997 6.39785 14.7913 6.36191 13.3908 6.52595V8.51919C14.5008 8.4772 15.0924 8.53118 16.1064 8.729V6.73577Z" fill="currentColor"></path>
<path d="M16.1064 9.45159C15.3997 9.11367 14.7913 9.07773 13.3908 9.24177V11.235C14.5008 11.193 15.0924 11.247 16.1064 11.4448V9.45159Z" fill="currentColor"></path>
<path d="M16.1064 12.1674C15.3997 11.8295 14.7913 11.7936 13.3908 11.9576V13.9508C14.5008 13.9088 15.0924 13.9628 16.1064 14.1606V12.1674Z" fill="currentColor"></path>
<path d="M16.1064 14.8827C15.3997 14.5448 14.7913 14.5089 13.3908 14.6729V16.6662C14.5008 16.6242 15.0924 16.6782 16.1064 16.876V14.8827Z" fill="currentColor"></path>
<path d="M16.1064 17.5986C15.3997 17.2606 14.7913 17.2247 13.3908 17.3887V19.382C14.5008 19.34 15.0924 19.394 16.1064 19.5918V17.5986Z" fill="currentColor"></path>
<path d="M23 3.29785C22.7161 1.75455 22.3243 1.08274 20.2844 1V3.29785C21.0793 3.07835 21.6948 3.07044 23 3.29785Z" fill="currentColor"></path>
<path d="M23 20.0093C22.7161 21.5526 22.3243 22.2244 20.2844 22.3071V20.4271C20.2844 20.2182 21.3507 19.8555 23 20.0093Z" fill="currentColor"></path>
<path d="M20.2844 4.02044C20.9911 3.68252 21.5996 3.64658 23 3.81062V5.80386C21.89 5.76187 21.2984 5.81585 20.2844 6.01367V4.02044Z" fill="currentColor"></path>
<path d="M20.2844 6.73577C20.9911 6.39785 21.5996 6.36191 23 6.52595V8.51919C21.89 8.4772 21.2984 8.53118 20.2844 8.729V6.73577Z" fill="currentColor"></path>
<path d="M20.2844 9.45159C20.9911 9.11367 21.5996 9.07773 23 9.24177V11.235C21.89 11.193 21.2984 11.247 20.2844 11.4448V9.45159Z" fill="currentColor"></path>
<path d="M20.2844 12.1674C20.9911 11.8295 21.5996 11.7936 23 11.9576V13.9508C21.89 13.9088 21.2984 13.9628 20.2844 14.1606V12.1674Z" fill="currentColor"></path>
<path d="M20.2844 14.8827C20.9911 14.5448 21.5996 14.5089 23 14.6729V16.6662C21.89 16.6242 21.2984 16.6782 20.2844 16.876V14.8827Z" fill="currentColor"></path>
<path d="M20.2844 17.5986C20.9911 17.2606 21.5996 17.2247 23 17.3887V19.382C21.89 19.34 21.2984 19.394 20.2844 19.5918V17.5986Z" fill="currentColor"></path>
<g clip-path="url(#clip0_631_1911)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.75632 11.6205C3.75632 15.2656 6.71124 18.2205 10.3563 18.2205C14.0014 18.2205 16.9563 15.2656 16.9563 11.6205C16.9563 7.9754 14.0014 5.02048 10.3563 5.02048C6.71124 5.02048 3.75632 7.9754 3.75632 11.6205ZM6.85699 9.03582C6.40752 8.71117 6.30268 8.07382 6.70985 7.69748C7.02021 7.41062 7.36464 7.1624 7.73544 6.95838C8.21815 6.6928 8.78741 6.98743 8.95857 7.51112L9.62386 9.54674C9.70829 9.80509 9.55914 10.0777 9.33904 10.2372C9.12033 10.3956 8.81791 10.4522 8.59899 10.2941L6.85699 9.03582ZM5.53548 13.6869C5.7693 14.1849 6.40202 14.2809 6.84797 13.9588L8.59731 12.6952C8.81645 12.5369 8.85589 12.2304 8.77214 11.9733C8.68871 11.7173 8.47771 11.494 8.20844 11.494H6.04598C5.49369 11.494 5.0362 11.9459 5.14268 12.4878C5.22404 12.9019 5.35596 13.3046 5.53548 13.6869ZM14.4746 11.494C15.0269 11.494 15.4844 11.9459 15.3779 12.4878C15.2965 12.9019 15.1646 13.3046 14.9851 13.6869C14.7513 14.1849 14.1186 14.2809 13.6726 13.9588L11.9233 12.6952C11.7041 12.5369 11.6647 12.2304 11.7484 11.9733C11.8319 11.7173 12.0429 11.494 12.3121 11.494H14.4746ZM11.5599 15.4704C11.7319 15.9967 11.4427 16.5728 10.8931 16.6396C10.4728 16.6907 10.0478 16.6907 9.62748 16.6396C9.0779 16.5728 8.78871 15.9967 8.9607 15.4704L9.62426 13.4401C9.70864 13.1819 9.98866 13.0492 10.2603 13.0492C10.5319 13.0492 10.8119 13.1819 10.8963 13.4401L11.5599 15.4704ZM12.7851 6.95838C12.3024 6.6928 11.7332 6.98743 11.562 7.51112L10.8967 9.54674C10.8123 9.80509 10.9614 10.0777 11.1815 10.2372C11.4002 10.3956 11.7027 10.4522 11.9216 10.2941L13.6636 9.03582C14.1131 8.71117 14.2179 8.07382 13.8107 7.69748C13.5004 7.41062 13.1559 7.1624 12.7851 6.95838Z" fill="currentColor"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.7126 11.6205C19.7126 16.7878 15.5237 20.9768 10.3563 20.9768C5.18897 20.9768 1 16.7878 1 11.6205C1 6.45313 5.18897 2.26416 10.3563 2.26416C15.5237 2.26416 19.7126 6.45313 19.7126 11.6205ZM17.6897 11.6205C17.6897 15.6706 14.4064 18.9538 10.3563 18.9538C6.30623 18.9538 3.02299 15.6706 3.02299 11.6205C3.02299 7.57039 6.30623 4.28715 10.3563 4.28715C14.4064 4.28715 17.6897 7.57039 17.6897 11.6205Z" fill="currentColor"></path>
</g>
<defs>
<clipPath id="clip0_631_1911">
<rect width="11.8851" height="18.7126" fill="white" transform="translate(1 2.26416)"></rect>
</clipPath>
</defs>
</svg>`;

const ANYLINE_MARK_XML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none">
<path d="M 160 79.995 C 160 35.813 124.184 0 79.997 0 C 35.816 -0.005 0 35.808 0 79.995 C 0 124.182 35.816 160 79.997 160 C 106.342 160 129.713 147.259 144.288 127.608 L 95.724 29.349 C 95.196 28.284 95.114 27.053 95.495 25.927 C 95.876 24.801 96.691 23.872 97.759 23.344 C 98.287 23.083 98.861 22.929 99.449 22.89 C 100.037 22.851 100.626 22.928 101.184 23.117 C 101.742 23.306 102.257 23.603 102.699 23.99 C 103.142 24.378 103.503 24.849 103.762 25.376 L 149.938 118.831 C 156.551 106.95 160.013 93.585 159.995 80 L 160 79.995 Z M 61.908 103.655 C 64.129 104.752 65.038 107.438 63.947 109.656 L 53.618 130.611 C 53.251 131.356 52.684 131.985 51.978 132.427 C 51.273 132.868 50.457 133.105 49.624 133.11 L 49.559 133.11 C 48.799 133.1 48.055 132.898 47.395 132.523 C 46.735 132.149 46.181 131.615 45.784 130.97 C 45.387 130.325 45.16 129.59 45.124 128.834 C 45.089 128.079 45.245 127.326 45.58 126.647 L 55.91 105.698 C 56.168 105.17 56.529 104.699 56.97 104.311 C 57.412 103.923 57.926 103.625 58.483 103.436 C 59.04 103.246 59.63 103.168 60.217 103.205 C 60.805 103.243 61.38 103.396 61.908 103.655 Z M 94.497 47.774 L 74.403 88.495 L 113.658 88.495 C 114.848 88.498 115.989 88.972 116.83 89.812 C 117.671 90.652 118.142 91.791 118.141 92.977 C 118.141 94.163 117.669 95.3 116.828 96.139 C 115.988 96.978 114.847 97.451 113.658 97.454 L 67.189 97.454 C 66.426 97.449 65.678 97.251 65.013 96.879 C 64.348 96.507 63.789 95.974 63.388 95.328 C 62.987 94.682 62.757 93.945 62.72 93.186 C 62.682 92.428 62.839 91.672 63.175 90.99 L 86.46 43.81 C 86.719 43.283 87.08 42.812 87.523 42.425 C 87.965 42.037 88.48 41.74 89.038 41.552 C 89.595 41.363 90.185 41.286 90.773 41.324 C 91.361 41.363 91.935 41.517 92.463 41.778 C 94.684 42.87 95.593 45.561 94.497 47.779 L 94.497 47.774 Z" fill="currentColor" fill-rule="evenodd"></path>
</svg>`;

type IconProps = {
  color: string;
  size?: number;
};

export function TireSidewallIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <SvgXml xml={TIRE_SIDEWALL_XML} width={size} height={size} color={color} />;
}

export function TireTreadIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return <SvgXml xml={TIRE_TREAD_XML} width={size} height={size} color={color} />;
}

export function AnylineMark({ color, size = 44 }: IconProps): React.JSX.Element {
  return <SvgXml xml={ANYLINE_MARK_XML} width={size} height={size} color={color} />;
}

export function CheckIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6 L9 17 L4 12"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ScanFrameIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8V4h4 M16 4h4v4 M20 16v4h-4 M8 20H4v-4"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FocusIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8V4h4 M16 4h4v4 M20 16v4h-4 M8 20H4v-4"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={2.6} fill={color} />
    </Svg>
  );
}

export function DownloadIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4v11 M8 11l4 4 4-4 M5 20h14"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ErrorIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M12 7.5v5.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={16.5} r={1.1} fill={color} />
    </Svg>
  );
}

export function ChevronIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TuneIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 8h16 M4 16h16" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={9} cy={8} r={2.4} fill={color} />
      <Circle cx={15} cy={16} r={2.4} fill={color} />
    </Svg>
  );
}

export function LinkIcon({ color, size = 16 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 13a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 11a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function RefreshIcon({ color, size = 18 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 11a8 8 0 1 0-.9 4.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M20 4v5h-5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
