import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  try {
    await platformBrowserDynamic().bootstrapModule(AppModule);
  } catch (error) {
    console.error('Bootstrap error:', error);
  }
};

bootstrap();
