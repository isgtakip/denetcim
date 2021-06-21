/*eslint-disable*/
export default function (ctx, inject) {
    let {
        app: { $axios },
    } = ctx;
const denetcimApi = $axios.create()
denetcimApi.setBaseURL(process.env.apiURL)
console.log(process.env.apiURL)
inject('denetcimApi', denetcimApi)
}
