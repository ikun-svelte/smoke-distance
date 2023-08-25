# smoke-distance
tweening engine for Typescript

## Install

```bash
npm i unplugin-vue-cssvars -D
```
Or
```bash
yarn add unplugin-vue-cssvars -D
```
Or
```bash
pnpm add unplugin-vue-cssvars -D
```
## Usage

```typescript
import SmokeDistance from 'b-tween';
const smoke = new SmokeDistance({
  from: {
    left: 0
  },
  to: {
    left: 700
  },
  duration: 500,
  easing: 'bounceOut',
  onUpdate: (keys) => {
    // You can do everything with keys
    block.style.left = keys.left + 'px';
  }
});
smoke.start();
```
## Thanks
[b-tween](https://github.com/PengJiyuan/b-tween)
