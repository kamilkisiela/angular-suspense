# Angular Suspense

React-like Suspense API for Angular applications.

> Very very very experimental

## Install

Using Yan:

    yarn add angular-suspense

Using NPM:

    npm install angular-suspense

## Setup

```typescript
import { SuspenseModule } from 'angular-suspense';

@NgModule({
  imports: [
    SuspenseModule,
    // ...
  ],
  // ...
})
export class AppModule {}
```

## Usage

```html
<error-boundary>
  <h2 fallback>Error!</h2>

  <suspense>
    <h2 fallback>Loading...</h2>
    
    <app-data></app-data>
  </suspense>
</error-boundary>
```

## Suspense API

```typescript
import { Suspense } from 'angular-suspense';

@Injectable()
export class DataService {
  suspense: Suspense;

  getUsers() {
    return this.suspense.use(this.usersService.getAll());
  }
}
```
