"use client";
import { Grid, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import UserCard from "./user-card";
import { ENDPOINTS } from "../../data/endpoints";

export default function CardContainer() {
  const [users, setUsers] = useState<any>([]);
  const getUsers = async () => {
    const response = await fetch(ENDPOINTS.USERS_URL);
    const data = await response.json();
    const initializedData = data.map((user: any) => ({
      ...user,
      followed: false,
    }));
    setUsers(initializedData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  function handleDelete(id: any) {
    const updatedUsers = users.filter((user: any) => user.id !== id);
    setUsers(updatedUsers);
  }

  // Also can use
  // const handleDelete = async (id: number) => {
  //   try {
  //     const response = await fetch(`${ENDPOINTS.USERS_URL}/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete user");
  //     }
  //   } catch (err) {
  //     console.log((err as Error).message);
  //   }
  // };
  function handleToggleFollow(id: any) {
    const updatedUsers = users.map((user: any) =>
      user.id === id ? { ...user, followed: !user.followed } : user
    );
    setUsers(updatedUsers);
  }

  console.log(users);

  return (
    <>
      {users.length == 0 && (
        <Flex justify="center" gap="xs" align="center" mt="xl">
          <Text size="lg" fw={500}>
            {" "}
            Currently user list is empty !!
          </Text>
        </Flex>
      )}
      <Grid p="lg">
        {users &&
          users.map((user: any, id: number) => {
            return (
              <Grid.Col key={id} span={{ base: 12, sm: 6, lg: 3 }}>
                <UserCard
                  user={user}
                  onToggleFollow={handleToggleFollow}
                  onDelete={handleDelete}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </>
  );
}
