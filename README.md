yobi-supporter
==============

chrome extension for [yobi](https://github.com/naver/yobi)

## Features

1. Add the Dual View mode to all markdown editor.
  ![screenshot_daulview.png](https://raw.githubusercontent.com/khongchi/yobi-supporter/master/screenshot_dualview.png)
2. Add user-defined menus to project menu. (use extension's popup page for configuration)
  ![screenshot_menu.png](https://raw.githubusercontent.com/khongchi/yobi-supporter/master/screenshot_menu.png)


## Installation

1. Clone git repository

  ```
  git clone https://github.com/khongchi/yobi-supporter.git yobi-supporter
  ```
1. Input your yobi project url to `content_scripts.matches` array in `manifest.json`
1. Visit  `chrome://extensions/` in your chrome
1. Ensure that the `Developer mode` checkbox in the top right-hand corner is checked
1. Click Load unpacked extension… to pop up a file-selection dialog.
1. Navigate to the `yobi-supporter` directory, and select it.

