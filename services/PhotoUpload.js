import superagent from "superagent";
export class Image {
  static async upload(base64) {
    const file = base64.split(";base64,").pop();
    return new Promise((resolve, reject) => {
      superagent
        .post("https://api.imgbb.com/1/upload")
        .field("key", process.env.IMGBB_API_TOKEN)
        .field("image", file)
        .then((res) => {
          try {
            resolve(res.body.data?.url);
          } catch (e) {
            reject({
              message:
                "An unexpected error occured. Please, mind contacting us for further help",
            });
          }
        });
    });
  }
}
