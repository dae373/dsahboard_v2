# 대학 등록금 선택 대시보드 — React

2025·2026년 대학알리미 등록금 자료를 사용하는 React + TypeScript + Vite 프로젝트입니다.

## 주요 기능

- 연도·학교유형·설립구분·지역·등록금 구간 필터
- 학교명 실시간 검색
- 평균·중앙값·최저·최고 등록금 KPI
- 학교유형·설립구분·지역·계열별 시각화
- 2025→2026 동일기관 등록금 증감률
- 상세 테이블과 정렬
- URL 쿼리스트링 필터 상태
- 모바일 반응형 UI
- 로딩·오류·빈 결과 처리

## 실행

Node.js가 설치된 환경에서:

```bash
npm install
npm run dev
```

브라우저에서 Vite가 안내하는 주소를 엽니다.

## 프로덕션 빌드

```bash
npm run build
npm run preview
```

`dist/` 폴더를 Vercel, Netlify, GitHub Pages, AWS S3 또는 정적 웹서버에 배포할 수 있습니다.

## 데이터 파일

```text
public/data/tuition-records.json
public/data/tuition-changes.json
public/data/metadata.json
```

## 데이터 범위

- 대학교
- 교육대학
- 산업대학
- 사이버대학
- 방송통신대학
- 각종학교
- 기술대학

제공 원자료에는 전문대학(2·3년제 등)이 포함되어 있지 않습니다. 평균은 학생 수 가중치가 없는 기관·캠퍼스 단순평균입니다.

## 구현 참고

현재 차트는 외부 차트 라이브러리 없이 React와 CSS/SVG로 구현했습니다. Recharts, ECharts 또는 Plotly.js로 교체하려면 각 차트 컴포넌트의 props 인터페이스를 유지한 상태에서 내부 구현만 변경할 수 있습니다.
