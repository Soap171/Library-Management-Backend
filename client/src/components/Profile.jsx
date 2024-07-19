import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [Error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/profile/${id}`);

        const json = await response.json();
        if (!response.ok) {
          setError(json.message);
          return;
        }

        const data = json.userInfo;
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, [id]);

  return <div>Profile</div>;
}

export default Profile;
