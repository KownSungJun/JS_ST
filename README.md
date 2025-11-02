# JS_ST

기본적인 js 기초 공부

## 왜 요즘 id 보다 class selector(선택자)를 더 쓰는가?


현대 프론트엔드(특히 React, Vue, SPA 구조등)에서는 id를 거의 안 쓴다 이유는
1. id는 고유하여야 하기 때문에 문서 내에서 1번씩만 쓸 수 있다
2. id는 스타일 우선순위가 높아 개발하다가 한참 나중에 스타일을 변경하려면 `!important`를 써야 하거나, 스타일 충돌이 쉽게 일어난다
3. js에서는 `getElementById`보다 `querySelector`를 자주 쓰이고 React 에선 id를 지정하지 않고 state나 ref를 통해 DOM을 다룬다
4. SPA(단일 페이지 앱) 시대에선 컴포넌트 단위로 관리해 컴포넌트의 재활용성에 id가 중복될 수 있음으로 않씀

하지만 스크롤 이동용 앵커(a)나 접근성(aria, label)에는 쓰인다
```html
<a href="#section1"></a> -> <section id="section1"></section>
<label for="input-id"> -> <input id="input-id" />
```

이런 특수한 경우 외에는 id보단 class, data-attribute, ref를 쓰는게 현대적인 방법이다.

## class selector에 띄어쓰기(space)
`class=".dot red"`하면 dot red가 className이 될까?

답은 아니다 이러면 .dot .red 두 class가 할당이 되는 것이다

만약 두 단어를 연결한 1개의 class를 할당하고 싶으면 하이픈(-) 이나 언더스코어(_)를 사용하면 된다.

이렇게 1개의 tag에 여러개의 class를 할당할 때에는 스타일이 중복되어 다른 tag에도 같은 스타일을 넣고 또 tag 마다 각각 다른 스타일을 넣고 싶을 때 사용한다
```html
<div class="dot r"></div>
<div class="dot y"></div>
<div class="dot g"></div>
```

```css
.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.dot.r {
    background: #ff5f56
}

.dot.y {
    background: #ffbd2e
}

.dot.g {
    background: #27c93f
}
```


만약 충돌(겹치는 속성)이 있을 때는 나중에 정의된 것이 우선한다
| 선택자 종류              | 예시                                    | 우선순위(강도)  |
| ------------------- | ------------------------------------- | --------- |
| 인라인 스타일             | `<div style="color:red">`             | **가장 높음** |
| ID 선택자              | `#idname {}`                          | 100       |
| Class / 속성 / 가상 클래스 | `.classname`, `[type=text]`, `:hover` | 10        |
| 태그 / 가상 요소          | `div`, `p`, `::after`                 | 1         |
| `*`, 상속된 스타일        | `* {}`, `color: inherit`              | 0         |

## JS IIFE 즉시실행 함수 표현식

