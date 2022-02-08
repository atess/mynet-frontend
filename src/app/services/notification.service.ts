import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../modules/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {
  }

  dismiss() {
    this.snackBar.dismiss();
  }

  default(message: string, isHandset?: boolean) {
    this.show(message, {
      duration: 3000,
      panelClass: 'default-notification-overlay'
    }, isHandset);
  }

  info(message: string, isHandset?: boolean) {
    this.show(message, {
      duration: 3000,
      panelClass: 'info-notification-overlay'
    }, isHandset, 'OK');
  }

  success(message: string, isHandset?: boolean) {
    this.show(message, {
      duration: 3000,
      panelClass: 'success-notification-overlay',
    }, isHandset);
  }

  warn(message: string, isHandset?: boolean) {
    this.show(message, {
      duration: 4000,
      panelClass: 'warning-notification-overlay'
    }, isHandset, 'OK');
  }

  error(message: string, isHandset?: boolean) {
    this.show(message, {
      duration: 5000,
      panelClass: 'error-notification-overlay'
    }, isHandset, 'OK');
  }

  private show(
    message: string,
    configuration: MatSnackBarConfig,
    isHandset?: boolean,
    action?: string) {

    if (!isHandset) {
      configuration.horizontalPosition = 'right';
      configuration.verticalPosition = 'top';
    }

    configuration.data = {
      action,
      html: message
    };

    this.zone.run(() => this.snackBar.openFromComponent(SnackBarComponent, configuration));
  }
}
