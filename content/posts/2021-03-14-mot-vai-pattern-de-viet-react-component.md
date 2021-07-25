---
slug: "2021-03-14-mot-vai-pattern-de-viet-react-component"
date: "2021-03-14"
title: "Một vài pattern để viết component của React cần dùng chung state"
desc: "Câu chuyện chia sẽ state và phương thức giữa các component chưa bao giờ là cũ trong React"
tags: ["js","react","hard"]
canonical_url: false
---

[TOC]

## compound component

Khi gặp tình huống một component không thể đứng độc lập, mà nó buộc phải kết hợp với một component khác và cùng chia sẻ một bộ state và phương thức. Đó là lúc chúng ta cân nhắc cách viết compound component.

Một ví dụ rất dễ thấy của compound component là element `<select />` và `<option />`, `<option/>` không thể đứng độc lập, nó luôn được đặt trong `<select/>` có thể truy xuất và gọi các phương thức tương tự như `<select/>`

**Tại sao lại sử dụng compound component?**

Nếu bạn là người viết component, người khác sử dụng component này, các dev khác sẽ cảm ơn bạn rất nhiều. Bạn đóng gói mọi thứ logic vào bên trong component cha như vậy, người sau sẽ không cần bận tâm nữa.

```jsx
// parent component
// xử lý event onChange, quản lý state selected value
<RadioImageForm>
	<RadioImageForm.RadioInput />
	<RadioImageForm.RadioInput />
	<RadioImageForm.RadioInput />
</RadioImageForm>
```

Với child component của `<RadioImageForm />`, để cho nó rõ ràng minh bạch là chúng ta sẽ sử dụng những giá trị cung cấp từ parent, chúng ta dùng kiểu viết `<RadioImageForm.RadioInput />`

```jsx
export class RadioImageForm extends React.Component<Props, State> {
	static RadioInput = ({
		currentValue,
	    onChange,
	    label,
	    value,
	    name,
	    imgSrc,
	    key,
	}: RadioInputProps): React.ReactElement => (
		// ...
	);
	onChange = (): void => {
	  // ...
	};

  state = {
    currentValue: '',
    onChange: this.onChange,
    defaultValue: this.props.defaultValue || '',
  };

  render(): React.ReactElement {
    return (
      <RadioImageFormWrapper>
        <form>
        {/* .... */}
        </form>
      </RadioImageFormWrapper>
    )
  }
}
```

Một nhu cầu rất phổ biến là người khác sẽ muốn control component con `<RadioInput />` bằng việc truyền thêm `prop`, nhưng thay vì truyền thằng vào component con, chúng ta hãy để họ truyền thông qua component cha `<RadioImageForm/>`, vì một lý do nào đó chúng ta cần truy cập các prop này bên trong component cha thì sao? Chúng ta làm thêm một bước `pass-through` các prop xuống cho component con với `React.Children.map` hoặc `React.cloneElement`

```jsx
render(): React.ReactElement {
  const { currentValue, onChange, defaultValue } = this.state;

  return (
    <RadioImageFormWrapper>
      <form>
        {
          React.Children.map(this.props.children, 
            (child: React.ReactElement) =>
              React.cloneElement(child, {
                currentValue,
                onChange,
                defaultValue,
              }),
          )
        }
      </form>
    </RadioImageFormWrapper>
  )
}
```

Quay lại với `<RadioInput />`

```jsx
static RadioInput = ({
  currentValue,
  onChange,
  label,
  value,
  name,
  imgSrc,
  key,
}: RadioInputProps) => (
  <label className="radio-button-group" key={key}>
    <input
      type="radio"
      name={name}
      value={value}
      aria-label={label}
      onChange={onChange}
      checked={currentValue === value}
      aria-checked={currentValue === value}
    />
    <img alt="" src={imgSrc} />
    <div className="overlay">
      {/* .... */}
    </div>
  </label>
);
```

Toàn bộ source code: https://codesandbox.io/s/compound-components-radio-image-form-k1h8x

### Hạn chế

Với cách viết compound component này, chúng ta bị một hạn chế là bắt buộc phai viết component theo kiểu

```jsx
<RadioImageForm>
	<RadioImageForm.RadioInput />
	<RadioImageForm.RadioInput />
	<RadioImageForm.RadioInput />
</RadioImageForm>
```
Chúng ta không được phép chèn thêm một số thẻ `<div />` ở giữa nếu có nhu cầu tùy biến giao diện chẳng hạn

```jsx
<RadioImageForm>
	<div>
	<RadioImageForm.RadioInput />
	<RadioImageForm.RadioInput />
	<RadioImageForm.RadioInput />
	</div>
</RadioImageForm>
```
[Compound component](https://codesandbox.io/s/compound-components-radio-image-form-k1h8x)
[Compound component với React Hook](https://codesandbox.io/s/functional-compound-components-w-hooks-radio-image-form-2zbhs)

## Flexible compound component

Flexible compound component ra đời để giải quyết hạn chế của compound component, chúng ta sẽ sử dụng React Context API.

Chúng ta sẽ tạo ra một `context` mà ở đó cả component con và cha điều có thể truy xuất được, đúng như mục đích ra đời của Context API

```jsx
const RadioImageFormContext = React.createContext({
  currentValue: '',
  defaultValue: undefined,
  onChange: () => { },
});
RadioImageFormContext.displayName = 'RadioImageForm';
```

Chúng ta sẽ refactor lại `<RadioImageForm/>`, bỏ đi đoạn `React.Children.map`, thay bằng `<Provider />`

```jsx
render(): React.ReactElement {
  const { children } = this.props;

  return (
    <RadioImageFormWrapper>
      <RadioImageFormContext.Provider value={this.state}>
        {children}
      </RadioImageFormContext.Provider>
    </RadioImageFormWrapper>
  );
}
```
> Sử dụng Provider có một lưu ý sống còn là đừng bao giờ truyền `value={{ some bla bla}}`, như vậy nó sẽ khác nhau trên tất cả những lần render, hãy nhớ truyền một thứ gì đó cache được và chỉ bị thay đổi khi cần thiết như this.state

Trong component con `<RadioInput />` chúng ta có thể truy xuất tất cả dữ liệu nội bộ thông qua *consumer*, bởi vì `<RadioInput />` đang nằm trong `<RadioImageForm />` luôn theo cách viết của chúng ta, nên có thể khai báo một static property `Consumer` bên trong `RadioImageForm`

```jsx
export class RadioImageForm extends React.Component<Props, State> {
  static Consumer = RadioImageFormContext.Consumer;
  //...
```

[Source code ví dụ](https://codesandbox.io/s/flexible-compound-components-radio-image-form-393y7)
[Source code Flexible compound component bằng functional component](https://codesandbox.io/s/functional-flexible-compound-components-w-hooks-radio-image-form-2u3sf)

## Provider Pattern

Provider pattern là kỹ thuật kết hợp giữa React Context API và render props pattern, vẫn là để giải quyết câu chuyện chia sẻ state giữa các component trong cây.

Nếu bạn có thắc mắc, ủa vậy sao không dùng Redux, Mobx, Recoil, React Sweet State, Rematch, Unstated,... cho khỏe người ơi? Thì câu trả lời của mình là, ừ các bạn nên xài những thư viện quản lý state như vậy cho khỏe người, khỏe cho cả người maintain code bạn. Còn đây là cách làm nếu bạn muốn tham khảo, nếu không dùng gì hết, tôi dư giả thời gian để code từ đầu thì bạn có thể go-ahead với cách này

```jsx
// src/components/DogDataProvider.tsx
interface State {
  data: IDog;
  status: Status;
  error: Error;
}

const initState: State = { status: Status.loading, data: null, error: null };

const DogDataProviderContext = React.createContext(undefined);
DogDataProviderContext.displayName = 'DogDataProvider';

const DogDataProvider: React.FC = ({ children }): React.ReactElement => {
  const [state, setState] = React.useState<State>(initState);

  React.useEffect(() => {
    setState(initState);

    (async (): Promise<void> => {
      try {
        // MOCK API CALL
        const asyncMockApiFn = async (): Promise<IDog> =>
          await new Promise(resolve => setTimeout(() => resolve(DATA), 1000));
        const data = await asyncMockApiFn();

        setState({
          data,
          status: Status.loaded,
          error: null
        });
      } catch (error) {
        setState({
          error,
          status: Status.error,
          data: null
        });
      }
    })();
  }, []);

  return (
    <DogDataProviderContext.Provider value={state}>
      {children}
    </DogDataProviderContext.Provider>
  );
};
```

```jsx
// src/components/DogDataProvider.tsx

export function useDogProviderState() {
  const context = React.useContext(DogDataProviderContext);

  if (context === undefined) {
    throw new Error('useDogProviderState phải được sử dụng bên trong DogDataProvider.');
  }

  return context;
}
```

```jsx
// src/index.tsx
function App() {
  return (
    <Router>
      <div className="App">
        {/* DataProvider phải nằm trên cùng của cây.*/}
        <DogDataProvider>
          <Nav />
          <main className="py-5 md:py-20 max-w-screen-xl mx-auto text-center text-white w-full">
            <Banner
              title={'React Component Patterns:'}
              subtitle={'Provider Pattern'}
            />
            <Switch>
              <Route exact path="/">
                {/* Component con sử dụng dữ liệu qua Consumer */}
                <Profile />
              </Route>
              <Route path="/friends">
                {/* Component con sử dụng dữ liệu qua Consumer */}
                <DogFriends />
              </Route>
            </Switch>
          </main>
        </DogDataProvider>
      </div>
    </Router>
  );
}
```
```jsx
const Profile = () => {
  // custom hook nhận "subscribes" khi có state thay đổi
  const { data, status, error } = useDogProviderState();

  return (
    <div>
      <h1 className="//...">Profile</h1>
      <div className="mt-10">       
        {error ? (
          <Error errorMessage={error.message} />
        ) : status === Status.loading ? (
          <Loader isInherit={true} />
        ) : (
          <ProfileCard data={data} />
        )}
      </div>
    </div>
  );
};
```

[Source Code Provider Pattern](https://codesandbox.io/s/provider-pattern-with-react-custom-hooks-llirx)

[React Component Patterns](https://dev.to/alexi_be3/react-component-patterns-49ho)