export class DateUtils {
  public static formatDate(originalDate: Date): string {
    if (originalDate) {
      const year = originalDate.getFullYear().toString();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // добавляем ведущий ноль, если месяц < 10
      const day = originalDate.getDate().toString().padStart(2, '0');
      const hours = originalDate.getHours().toString().padStart(2, '0');
      const minutes = originalDate.getMinutes().toString().padStart(2, '0');
      const seconds = originalDate.getSeconds().toString().padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    }
    return "";
  }
}
