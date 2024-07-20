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
} from "mdb-react-ui-kit";
import { useUserData } from "../hooks/useUserData";
import Header from "./Header";

function Profile() {
  const { id } = useParams();
  const { status, data, error } = useUserData(id);

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
                    {data?.userInfo?.dateJoined}
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Update</MDBBtn>
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
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {data?.userInfo?.firstName} {data?.userInfo?.lastName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {data?.userInfo?.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {data?.userInfo?.phoneNumber}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {data?.userInfo?.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
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
