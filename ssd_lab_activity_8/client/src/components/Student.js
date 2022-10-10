import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URI = "http://localhost:4000/std/";

function Profile(props) {
  const img_link = "https://i.ibb.co/0mR0RTc/user.jpg";
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
      };

      var res = await fetch(BACKEND_URI + `${email}/queries`, requestOptions);

      if (res.status == 200) {
        console.log(res);
        setData(res.result);
      }
    })();
  }, []);

  const tableStyle = {
    width: "fit-content",
    margin: "auto",
    border: "1px solid black",
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const email = sessionStorage.getItem("token");

  // If email is null it means the session variable is not set and hence the user
  // has not logged in yet
  if (email == null) {
    return (
      <p>
        Please Login First.
        <button onClick={navigateToLogin} className='btn btn-primary'>
          Go To Login
        </button>
      </p>
    );
  }

  // control comes here if email is not null.
  return (
    <div>
      <button
        className='btn btn-primary m-4'
        onClick={async (e) => {
          const requestOptions = {
            credentials: "include",
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          var res = await fetch(BACKEND_URI + "logout", requestOptions);
          {
            /* alert((await res.json())["msg"]); */
          }

          if (res.status == 200) {
            sessionStorage.removeItem("curr_email");
            navigateToLogin();
          }
        }}
      >
        Logout
      </button>
      <Link to='/student/addQuery'>
        <button className='btn btn-primary m-4'>Add Query</button>
      </Link>
      <h2 className='text-center'> Welcome, {email} </h2>
      <div className='text-center'>
        <img className='img-thumbnail w-10 h-10 m-4' src={img_link} alt='' />
        <table style={tableStyle}>
          {data &&
            data.map((row) => (
              <tr key={row}>
                <td style={{ border: "1px solid black" }}>{row[0]}</td>
                <td style={{ border: "1px solid black" }}>{row[1]}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Profile;
