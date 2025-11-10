# overflow
- 많은 양의 컨텐츠를 제한된 영역에서 처리할 때 사용
## visible(default) 
- 컨텐츠가 내부 공간 안에 다 안들어 가도 끝까지 다 보여줌
https://codepen.io/daleseo/pen/bGgRwRb
- 컨텐츠가 곂치면 혼란스러울 수 있음

## hidden 
- 밖으로 빠져나오는 컨텐츠를 숨길 수 있음
https://codepen.io/daleseo/pen/vYgZgdJ
- 의도치 않게 컨텐츠가 누락될 수 있음으로 주의
- 일부러 일부만 보이게 해서 미학적으로도 사용할 수 있음
https://codepen.io/daleseo/pen/vYgZgre


## scroll
- 스크롤바를 생성해 끝까지 볼 수 있게 함
https://codepen.io/daleseo/pen/vYgZgre
- overflow 속성 대신에 overflow-x 나 overflow-y를 사용하면 가로 또는 세로만 선택적으로 스크롤바를 생성할 수 있다

## auto
- 컨텐츠의 양이 가변적이어서 선택하기 애매할 때 사용함
- 콘텐츠의 크기가 주어진 공간을 넘어가는 경우에만 스크롤 바가 생성됨
https://codepen.io/daleseo/pen/wvgeJKZ

## [꿀팁] 가로 스크롤
- 주어진 공간을 넘어가는 컨텐츠를 줄바꿈하지 않고 사용자가 가로 방향으로만 스크롤할 수 있도록 할 때 이 방법을 사용함
- 기본적으로 텍스트나 이미지와 같은 인라인 요소들은 가로 공간이 부족한 경우 줄바꿈이 되기에, 세로 방향 스크롤 바가 생기는데 이 같은 경우를 방지하고 싶다면 `white-space` 속성을 `nowarp`으로 변경하면 된다(`overflow : auto` 상태에서)
https://codepen.io/daleseo/pen/LYxLWGO

- 이때 `overflow` 속성을 활용하는 것보다 어떻게 하면 컨텐츠가 요소를 넘기지 않도록 디자인할 수 있을까 고민하는 것이 중요하다
- 요소에 컨텐츠를 담을 충분한 공간이 있다면 굳이 삐져나오는 부분을 어떻게 처리할지 고민할 필요가 없다
- 일반적으로 브라우저 전체 창이 아닌 요소 범위에서 생기는 스크롤바는 키보드 사용자가 스크롤하기 어렵기 때문에 웹 접근성(accessibility) 측면에서도 불편한 점이 생긴다
- 컨텐츠가 삐져나오는 것을 방지하기 위한 방법으로 `height`를 줘서 높이를 제한하지 않는 것이다

# position
- HTML 문서 상에서 요소가 배치되는 방식을 결정함
- 정확한 위치 지정을 위해 `top`, `left`, `bottom`, `right` 속성과 함께 사용된다

## static(default)
- HTML 문서 상에서 원래 있어야하는 위치에 배치됨
- 따라서 `top`, `left`, `bottom`, `right` 속성은 `position` 속성이 `static`일 때는 무시된다
https://codepen.io/daleseo/pen/mdMdzob

## relative
- 요소를 원래 위치에서 벗어나게 배치할 수 있게 됨
- 요소를 원래 위치를 기준으로 상대적(relative)으로 배치해준다고 이해하면 쉬움
- 요소의 위치 지정은 `top`, `bottom`, `left`, `right` 속성을 이용해, 요소가 원래 위치에 있을 때의 상하좌우로 부터 얼마나 떨어지게 할지를 지정할 수 있음
https://codepen.io/daleseo/pen/qBXBJzg

## absolute
- 배치 기준을 자신의 상위 요소에서 찾는다
- DOM 트리를 따라 올라가다가 `position` 속성이 `static`이 아닌 첫 번째 상위 요소가 해당 요소의 배치 기준이 된다
- 만약 해당 요소 상위에 `position` 속성이 `static`이 아닌 요소가 없다면, DOM 트리에 최상위에 있는 `<body>`요소가 배치 기준이 된다
- 대부분의 경우 ,부모 요소(가장 가까운 상위 요소)를 기준으로 `top`, `left`, `bottom`, `right` 속성을 적용해야하기 때문이다
- 따라서 어떤 요소의 `position` 속성을 `absolute`로 설정하면, 부모 요소의 `position` 속성을 `relative`로 지정해 주는게 관례이다
https://codepen.io/daleseo/pen/abybRra
- HTML 문서 상에서 독립되어 앞뒤에 나온 요소와 더 이상 상호작용하지 않게 된다

## fixed
- 화면을 위아래로 스크롤하더라도 브라우저 화면의 특정 부분에 고정되어 움직이지 않는 UI를 만들고 싶을 때 사용
- `fixed` 속성값의 배치 기준이 자신이나 부모 요소가 아닌 뷰포트(viewport), 즉 브라우저 전체화면이다
- `top`, `left`, `bottom`, `right` 속성은 각각 브라우저의 상좌하우측으로 부터 해당 요소가 얼마나 떨어져있는지를 결정한다
https://codepen.io/daleseo/pen/rNzNqXv

## sticky
https://codepen.io/daleseo/pen/LYjYgrg

# cusor
- 요소 위에 마우스 커서가 올라갔을 때 보여줄 모양을 지정함
https://developer.mozilla.org/ko/docs/Web/CSS/Reference/Properties/cursor

# transition

# transform

# animation
- CSS Animation은 여러 CSS 스타일 속성으로 요소의 크기, 색상, 모양 등을 제어해 애니메이션 효과를 부여하는 기술이다
- JS를 샤용하지 않고도 간단하게 요소의 동적 효과를 부여할 수 있기 때문에, 보다 좋은 성능으로 애니메이션을 구현할 수 있다
## 전환 vs 애니메이션
- CSS 전환(Transition)은 요소의 전후 상태를 부드럽게 변화시키는 효과를 제공하며, 단지 시작과 종료 상태만 고려하면 되기 때문에 간단하게 사용할 수 있다
- 반면, 애니메이션(Animation)은 시작과 종료 뿐만 아리라 중간 상태도 고려할 수 있으며, 더 복잡하고 다양한 효과를 추가할 수 있다
## @keyframes
- `@Keyframes`는 '애니메이션 프레임'을 정의하는 CSS 규칙이다
- `from`, `to`키워드로 애니메이션의 시작과 종료 스타일을 정의하거나, `0%`뷰터`100%`사이의 퍼센트 값으로 각 단계의 애니메이션을 정의할 수 있다