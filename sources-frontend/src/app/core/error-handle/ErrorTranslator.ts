import {errors} from "./errors";

export class ErrorTranslator {

  public static prepare(data: any): string {
    if(data.error){
      if(data.error.message){
        return data.error.message;
      }
      if(data.error.error){
        return data.error.error;
      }
      if(data.message){
        return data.message;
      }
      return '???';
    }else{
      return JSON.stringify(data).substring(0, 255)+' ...';
    }
  }

  public static translate(error: string): string {
    var comment = '';
    error = error.replace(/(CONNECTION_TIMEOUT|FAIL_SOCKET_CONNECT|RESULT_IS_EMPTY)(.+)/, function(a, b, c){
      comment = c;
      return b;
    });
    return (errors.get(error) || error) + comment;
  }

}
