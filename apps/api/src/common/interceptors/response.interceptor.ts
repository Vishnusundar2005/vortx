import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  result: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: unknown) => {
        const payload = data as Record<string, unknown> | undefined | null;
        return {
          success: true,
          message:
            typeof payload?.message === 'string'
              ? payload.message
              : 'Operation successful',
          result: (payload?.result !== undefined ? payload.result : data) as T,
        };
      }),
    );
  }
}
