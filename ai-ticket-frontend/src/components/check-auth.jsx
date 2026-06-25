import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protected: isProtected }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isProtected) {
      if (!token) {
        navigate("/login", { replace: true });
      } else {
        setLoading(false);
      }
    } else {
      if (token) {
        navigate("/", { replace: true });
      } else {
        setLoading(false);
      }
    }
  }, [isProtected, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default CheckAuth;