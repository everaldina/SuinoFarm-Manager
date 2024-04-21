import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AutenticacaoService } from './autenticacao.service';
import { AuthComponent } from './components/auth/auth.component';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AuthComponent
  ],
})
export class AuthModule { }
