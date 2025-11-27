export class NewsUtils {
  /**
   * Заменяем каждый символ новой строки на <br>
   */
  public static replaceNewlinesWithBr(input: string): string {
    return input.replace(/(\n|\\n)/g, '<br>');
  }
}
