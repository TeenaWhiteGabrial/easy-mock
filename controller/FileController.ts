import FileService from '../service/FileService';
import { Context } from 'koa'

interface KoaCtx extends Context{
  request:any
}

class FileController {
  private service: FileService = new FileService();

  upload = async (ctx: KoaCtx) => {
    const files = ctx.request.files.file;
    console.log(files);

    if (files.length === undefined) {
      this.service.upload(ctx, files, false);
    } else {
      this.service.upload(ctx, files, true);
    }
  };
}

export default new FileController();
