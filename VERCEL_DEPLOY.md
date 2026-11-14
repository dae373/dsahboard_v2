# Vercel 배포 안내

이 버전은 오류 메시지에 나온 두 설정을 직접 수정했습니다.

- tsconfig.app.json: src/**/*.ts, src/**/*.tsx를 포함
- tsconfig.node.json: noEmit: true 추가
- allowImportingTsExtensions는 noEmit과 함께 사용
- package build: tsc -b && vite build

## 저장소 구조

package.json
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
vercel.json
index.html
src/

`src/App.tsx`가 반드시 저장소 루트의 src 폴더 안에 있어야 합니다.

## Vercel

Framework Preset: Vite
Build Command: npm run build
Output Directory: dist

프로젝트가 저장소 하위 폴더에 있다면 Vercel Root Directory를 그 폴더로 지정해야 합니다.
