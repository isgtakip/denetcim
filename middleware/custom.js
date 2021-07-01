/*eslint-disable*/
export default async function ({ app, redirect,$axios,$gates,$auth }) {
    $axios.setBaseURL(process.env.apiURL)
    if ($auth.loggedIn) {
        const [permissions] = await Promise.all([
          $axios.get('/getAllPermissionsAttribute'),
        ])
  
        $gates.setPermissions(permissions.data)
        console.log("aaa")
  
      }
  
  }