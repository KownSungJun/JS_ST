# Js Event

# 이벤트 흐름 제어 (버블링 & 캡처링)
## HTML 이벤트의 흐름
HTML 문서의 각 앨리먼트들은 태그 안에 태그가 위치하는 식으로 계층적으로 이루어짐을 볼 수 있다.

이러한 계층적 구조 특징 때문에 만일 HTML 요소에 이벤트가 발행할 경우 연쇄적 이벤트 흐름이 일어나게 된다.

```html
<form onclick="alert('form')">Form
  <div onclick="alert('div')">div
    <p onclick="alert('p')">p</p>
  </div>
</form>
```
중첩된 박스 영역에 가장 자식 앨리먼트인 p 박스를 클릭하면 onclick 이벤트 스크립트가 p 뿐만 아니라 그의 부모의 div와 form 앨리먼트도 이벤트가 발생함을 알 수 있다
![alt text](image.png)
이러한 현상을 이벤트 전파