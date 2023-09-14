import React from "react";
import styles from "../assets/css/modules/Login.module.css";
const Login = () => {
  return (
    <>
      <form>
        
        <div className={styles.maincontainer}>
        <div className={styles.loginheading}>
         <h1>NAYARA</h1>
        </div>
          <input
            className={styles.logininput}
            type="email"
            placeholder="xxx@email.com"
          />
          <input
            className={styles.logininput}
            type="password"
            placeholder="********"
          />

          <button className={styles.loginbutton}>Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
