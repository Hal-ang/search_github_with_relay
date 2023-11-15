# Github 레포 검색
**간편하게 깃허브 레포를 검색해 보세요!**
> [github graphql API](https://docs.github.com/en/graphql)를 활용한 프로젝트입니다.

<br>
<img width="900" alt="Screenshot 2023-11-15 at 8 18 04 PM" src="https://github.com/Hal-ang/search_github_with_relay/assets/68503014/afa7b261-b5c1-40ee-9e5f-9861d1f9faa6">
<br>

# 실행 방법

**1. `.env` 파일 생성 후 설정**

```
REACT_APP_GITHUB_AUTH_TOKEN=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
```

> 프로젝트를 위해 따로 생성한 계정의 키입니다.

<br>

**2. 터미널 실행**

```
$npm install
$npm run start
```

<br>


# 기능

**1. 깃헙 레포지토리 검색**

- 검색어 입력 후 목록 확인

![진입부터 검색 이동](https://github.com/Hal-ang/search_github_with_relay/assets/68503014/857b0858-2715-4cc5-9b66-ba5c22f87d55)
<br>

- 인피니티 스크롤을 통한 페이지네이션

![인피니티 스크롤](https://github.com/Hal-ang/search_github_with_relay/assets/68503014/2505270d-d6ea-4320-aac2-13baf63a0be0)
<br>

**2. 깃헙 star 토글 기능**

![star](https://github.com/Hal-ang/search_github_with_relay/assets/68503014/03fbeb1b-eb8f-4628-8417-b1764988c8e2)
<br>


<br>

# 사용 기술

## React (기본 요구사항)

**CSR 환경인 이유**

- 기간 내 완성도를 높이기 위함 (`Next.js` 경험의 부재로 필수 기술인 `Relay` 학습에 초점을 두어 기간 내 완성도를 높이는 데에 집중했습니다.)

<br>

**라우팅**

- `react-router-dom`을 통한 클라이언트 사이드 라우팅, 오류 페이지 핸들링

<br>

**에러 핸들링**

- `react-router-dom/errorElement` + `react-error-boundary` 를 통한 오류페이지 구현

<br>

## Relay (기본 요구사항) + GraphQL

> GraphQL 통신 기반, 자바스크립트 비동기 데이터 페칭 및 상태관리 라이브러리

<br>

**co-location 패턴 적용**

- 컴포넌트와 컴포넌트가 필요로 하는 데이터를 한 파일 내에서 확인할 수 있도록 구현

<br>

**`usePaginationFragmentQuery` + `IntersectionObserver` 페이지네이션**

-  `relay/usePaginationFragmentQuery` 사용, React/state 관리 없이 relay 스토어에 저장하고 있는 목록을 그대로 렌더링할 수 있도록 구현
<br>

- `SearchList.tsx` 하단 footer를 `IntersectionObserver`로 감지하여 인피니티 스크롤 구현
  - 유효 데이터가 존재하고 footer가 뷰포인트에 존재하는 경우 호출

<br>

## TailwindCSS (style)

**pxr 단위 정의**

- 반응형 사이즈 구현을 위한 pxr 단위 정의 (tailwind.config.js)
  - `16pxr === 1rem`, px 값을 pxr로 사용하여 rem으로 자동 변환


<br>

# 페이지 구성
<br>

모든 페이지는 최상위 컴포넌트 `App.tsx`로부터 파생됩니다.  
`/src/pages` 폴더 내 구현되어 있는 각 컴포넌트를 페이지로 취급합니다.

![routing](https://github.com/Hal-ang/search_github_with_relay/assets/68503014/a459c79f-2f7d-46ee-bf68-727efd09c102)


<br>

# 검색, 데이터 흐름도
<br>

![Untitled Diagram](https://github.com/Hal-ang/search_github_with_relay/assets/68503014/a46e95ab-6e8b-4760-9e87-d3c8dd2b6637)

