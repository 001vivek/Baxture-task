"use client";
import {
  Card,
  Image,
  Text,
  Button,
  Flex,
  Anchor,
  Container,
} from "@mantine/core";
import {
  IconUserPlus,
  IconUserMinus,
  IconTrash,
  IconAt,
  IconPhoneCall,
  IconWorld,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";
import { ENDPOINTS } from "../../data/endpoints";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  followed: boolean;
}

interface UserCardProps {
  user: User;
  onToggleFollow: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onToggleFollow,
  onDelete,
}) => {
  const avatarUrl = `${ENDPOINTS.USERS_AVATAR}${encodeURIComponent(user.name)}`;

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Container size={200}>
        <Link href={`https://${user.website}`} replace>
          <Image
            src={avatarUrl}
            height={120}
            width={120}
            radius="50%"
            alt={`${user.name}'s avatar`}
          />
        </Link>
      </Container>

      <Flex justify="center" gap="xs" align="center" mb="xs" mt="md">
        <Text size="lg" fw={500}>
          {user.name}
        </Text>
        {user.followed ? <IconStar size={16} /> : null}
      </Flex>

      <Flex gap="xs" align="center" mb={4} direction="row">
        <IconAt color="#938a8a" size={16} />
        <Anchor c="dimmed" href={`mailto:${user.email}`} target="_blank">
          {user.email}
        </Anchor>
      </Flex>

      <Flex gap="xs" mb={4} align="center" direction="row">
        <IconPhoneCall color="#938a8a" size={16} />
        <Anchor c="dimmed" href={`tel:${user.phone}`} target="_blank">
          {user.phone}
        </Anchor>
      </Flex>

      <Flex gap="xs" align="center" mb={4} direction="row">
        <IconWorld color="#938a8a" size={16} />
        <Anchor c="dimmed" href={`https://${user.website}`} target="_blank">
          {user.website}
        </Anchor>
      </Flex>

      <Flex gap="xs" mt="md" justify="between">
        {user.followed ? (
          <Button
            variant="default"
            fullWidth
            onClick={() => onToggleFollow(user.id)}
          >
            <IconUserMinus size={16} style={{ marginRight: "0.5rem" }} />
            Unfollow
          </Button>
        ) : (
          <Button fullWidth onClick={() => onToggleFollow(user.id)}>
            <IconUserPlus size={16} style={{ marginRight: "0.5rem" }} />
            Follow
          </Button>
        )}
        <Button onClick={() => onDelete(user.id)} variant="outline" fullWidth>
          <IconTrash size={16} style={{ marginRight: "0.5rem" }} />
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

export default UserCard;
