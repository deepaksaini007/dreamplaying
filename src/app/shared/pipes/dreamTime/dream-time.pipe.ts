import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dreamTime',
})
export class DreamTimePipe implements PipeTransform {
  transform(timeString: string): Date | undefined {
    if (timeString == '' || !timeString) return undefined;
    var d = new Date();
    var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/);
    if (time) {
      d.setHours(
        parseInt(time[1]) + (parseInt(time[1]) < 12 && time[4] ? 12 : 0)
      );
      d.setMinutes(parseInt(time[3]) || 0);
      d.setSeconds(0, 0);
      return d;
    }
    return undefined;
  }
}
