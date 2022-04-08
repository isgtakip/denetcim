/*eslint-disable*/
export default async function ({ redirect,$gates,$auth }) {
 if ($auth.loggedIn) {
     $gates.setPermissions($auth.user.permissions)
     $gates.setRoles($auth.user.roles);
   }
      
  }
