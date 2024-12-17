import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "@env";
import { isDeelnemerDTO } from "@shared/models";
import { parse } from "date-fns";
import { UTCDate } from '@date-fns/utc';
import { map, Observable } from "rxjs";

export function deelnemerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (shouldIntercept(req)) {
    return next(req).pipe(map(toModel));
  } else {
    return next(req);
  }

  function toModel(event: HttpEvent<unknown>) {
    if (event.type != HttpEventType.Response
      || !event.ok
      || !isDeelnemerDTO(event.body)
    ) { return event; }

    const geboortedatum = parse(event.body.geboortedatum, 'yyyy-MM-dd', new UTCDate());
    const body = {
      ...event.body,
      geboortedatum
    };
    return event.clone({ body });
  }

  function shouldIntercept(request: HttpRequest<unknown>) {
    return request.method === 'GET' &&
      request.url
        .split(`${environment.apiUrl}/`)
        .pop() === 'deelnemer';
  }
}