import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardHeader,
  MDBInput,
} from "mdb-react-ui-kit";
import { useUserData } from "../hooks/useUserData";
import Header from "./Header";

function Profile() {
  const { id } = useParams();
  const { status, data, error } = useUserData(id);
  const [isEditable, setIsEditable] = useState(false);
  const toggleEdit = () => setIsEditable(!isEditable);

  const [address, setAddress] = useState(data?.userInfo?.address || "");
  const [email, setEmail] = useState(data?.userInfo?.email || "");
  const [firstName, setfirstName] = useState(data?.userInfo?.firstName || "");
  const [lastName, setlastName] = useState(data?.userInfo?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(
    data?.userInfo?.phoneNumber || ""
  );

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlefirstNameChange = (e) => setfirstName(e.target.value);
  const handlelastNameChange = (e) => setlastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  // Update state when `data` changes
  useEffect(() => {
    if (data?.userInfo) {
      setAddress(data.userInfo.address || "");
      setEmail(data.userInfo.email || "");
      setfirstName(data.userInfo.firstName || "");
      setlastName(data.userInfo.lastName || "");
      setPhoneNumber(data.userInfo.phoneNumber || "");
    }
  }, [data]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={data?.userInfo?.profilePic}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className=" mb-1">@{data?.userInfo?.username}</p>
                  <p className="text-muted mb-4">
                    Member Since{" "}
                    {new Date(data?.userInfo?.dateJoined).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={toggleEdit}>
                      {isEditable ? "Save" : "Edit"}
                    </MDBBtn>
                    <MDBBtn outline className="ms-1">
                      Log out
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardHeader>Loved Books</MDBCardHeader>
                <MDBCardBody className="p-0">
                  <MDBListGroup flush>
                    {data?.userInfo?.interestedBooks?.length > 0 ? (
                      data?.userInfo?.interestedBooks.map((book, index) => (
                        <MDBListGroupItem key={index}>{book}</MDBListGroupItem>
                      ))
                    ) : (
                      <MDBListGroupItem>
                        You don't have interested books
                      </MDBListGroupItem>
                    )}
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="First Name"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={firstName}
                        onChange={handlefirstNameChange}
                        readOnly={!isEditable}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Last Name"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={lastName}
                        onChange={handlelastNameChange}
                        readOnly={!isEditable}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Email"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={email}
                        onChange={handleEmailChange}
                        readOnly={!isEditable}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Mobile"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        readOnly={!isEditable}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBCol md="12">
                    <MDBInput
                      label="Address"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={address}
                      onChange={handleAddressChange}
                      readOnly={!isEditable}
                    />
                  </MDBCol>
                </MDBCardBody>
              </MDBCard>

              <MDBRow>
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardHeader>Reservations</MDBCardHeader>
                    <MDBCardBody>
                      <MDBListGroup flush>
                        <MDBListGroup flush>
                          {data?.userInfo?.reservations?.length > 0 ? (
                            data?.userInfo?.reservations.map((book, index) => (
                              <MDBListGroupItem key={index}>
                                {book}
                              </MDBListGroupItem>
                            ))
                          ) : (
                            <MDBListGroupItem>
                              You don't have any Reservations on books
                            </MDBListGroupItem>
                          )}
                        </MDBListGroup>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardHeader>Reservations</MDBCardHeader>
                    <MDBCardBody>
                      <MDBListGroup flush>
                        <MDBListGroup flush>
                          {data?.userInfo?.borrowedBooks?.length > 0 ? (
                            data?.userInfo?.borrowedBooks.map((book, index) => (
                              <MDBListGroupItem key={index}>
                                {book}
                              </MDBListGroupItem>
                            ))
                          ) : (
                            <MDBListGroupItem>
                              You don't have any Borrowed Books
                            </MDBListGroupItem>
                          )}
                        </MDBListGroup>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default Profile;
