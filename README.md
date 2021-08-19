# Situ Angular Components

This package is used through the Situ Live applications to provider commonly used components, services, and directives.

## Getting started

This package is split up into multiple modules to help facilitate tree shaking and allows you to cherry pick what you actually need in your application

## Lazy modules

Just like any other module, if you need to import any of the modules that have **forRoot** methods. Ensure that the **forRoot** method is imported in your **AppModule** (or **CoreModule** if you have one) and every module that needs to import another instance should do so by ommitting the **forRoot** method like so:

```
@NgModule({
  declarations: [],
  exports: [],
  imports: [
    ComponentsModule,
    ImagesModule,
  ],
})
export class SharedModule {}
```

This will ensure services remain Singletons and new instances are not created erroneously.

## Animations

The animations module includes the **animate** directive and some common angular animations.

### Get Started

To use this module in your application, simply import the **AnimationsModule** as follows:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    AnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Error snackbar

The error snack module is used to display Angular Material snackbars.

### Get Started

To use this module in your application, simply import the **ErrorSnackbarModule** as follows:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    ErrorSnackbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Once imported, you can use the `<situ-error-snackbar></situ-error-snackbar>` component within your project.
If you wish to display the snackbars for all errors, you can simple add it to the **app.component.html** file. Otherwise, you can modually use it by including it in any component where you wish to view the snackbars.

Including the component by itself will not display snackbars for all http errors. If you are using the Situ API, then you will need to register the **ErrorInterceptor** as follows:

```
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
```

which is imported from `import { ErrorInterceptor } from '@situlive/angular/data';`.
This will handle any error attempts.

If you are using another API, then you will have to create your own interceptor.
The **ErrorInterceptor** makes use of the **NotificationService** which you can use in your own applicaiton.
In order for your custom interceptor, you should inject the **NotificationService** into your interceptor and add the errors as follows:

```
this.notificationService.add({
  message,
  type: failed ? 'mat-warning' : 'mat-success',
});
```

This will then allow the `<situ-error-snackbar></situ-error-snackbar>` to display any error messages added by your custom interceptor.
Alternatively, you can use the **SnackBarService** to display your own snackbars for noticiation purposes and completely omit the **NotificationService**.
To do this, import the **SnackBarService** into your component:

```
import { SnackBarService } from '@situlive/angular/material/error-snackbar';
```

And then display your message as follows:

```
this.snackbarService.show({
    message:
        'You have successfully completed this product. Please go to the dashboard to review and approve it.',
});
```

## Authentication

All of our applications use a central Identity Server to authenticate and consume our APIs. Because of this, we have created a module that exposes services to facilitate authentication.

### Get Started

To use this module in your application, you need to import the **AuthModule** as follows:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    AuthModule.forRoot(environment.authentication),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

your **environment.authentication** object must implement the **AuthConfig**:

```
export interface AuthConfig {
  basicAuthorization: string;
  identityServerUrl: string;
  grantType: string;
  scopes: string;
}
```

Your **AppModule** could look like this:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    AuthModule.forRoot({
        basicAuthorization: 'Basic Y2xpZW50OmtXdnlQJHBLWEFSNnFHLUg=',
        identityServerUrl: 'https://localhost:44362',
        scopes: 'sxp identity',
        grantType: 'password',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

For security purposes, we suggest you keep your configuration in your **environments** file.

## Contentful

Our chosen CMS is Contentful. It is a headless CMS solution and provides use with great flexibility when creating new pages.
A module has been created with all the components and services needed to interact with with Contentful.

### Get Started

To use this module in your application, you need to import the **ContentfulModule** as follows:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    ContentfulModule.forRoot(environment.contentful),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

your **environment.contentful** object must implement the **ContentfulConfig**:

```
export interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
}
```

Your **AppModule** could look like this:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    ContentfulModule.forRoot({
        spaceId: "123";
        accessToken: "123";
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

For security purposes, we suggest you keep your configuration in your **environments** file.

## Data

For ease of use when communicating with our API we have developed a set of services for every endpoint of our API.
To use these services, you need to improt the **DataModule** into your application.

### Get Started

To use this module in your application, you need to import the **DataModule** as follows:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    DataModule.forRoot(environment.data),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

your **environment.data** object must implement the **HttpServiceConfig**:

```
export interface HttpServiceConfig {
  apiUrl: string;
  identityServerUrl: string;
}
```

Your **AppModule** could look like this:

```
@NgModule({
  declarations: [],
  imports: [
    ...
    DataModule.forRoot({
        apiUrl: 'https://localhost:44384';
        identityServerUrl: 'https://localhost:44362';
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

For security purposes, we suggest you keep your configuration in your **environments** file.

## Images

Our applications can be quite image/video heavy, so to help with performance, we have utilized Cloudinary for all our resizing needs.
Cloudinary allows us to have responsive images and videos that resize based on the device requesting the image (for example, when looking at our applications from a mobile, Cloudinary will resize all images to match the device width to save on bandwidth).

## Get Started

## Universal

To help with Angular Universal and performance, we have a module that deals with caching server requests and serving the cached results to the browser. This eliminates multiple requests to the same endpoint.

## Get Started

Modules do not need to be imported to get this working.
You must **provide** two interceptors. The first one must be in the **AppModule** (or CoreModule, if you have one) like this:

```
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
```

And the second one must be in the **AppServerModule** like this:

```
@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
```

This will intercept all request and handle the caching of their responses using the url as a key.

## Building

To build this project, you must set the mem size like this:

```
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build angular --prod
```
