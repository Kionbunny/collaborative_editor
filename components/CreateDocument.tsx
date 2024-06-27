'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { createDocument } from '@/lib/actions/room.actions';

import { Button } from './ui/button';

export const CreateDocument = ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const router = useRouter();

  const createDocumentHandler = async () => {
    try {
      const room = await createDocument({
        userId,
        email,
      });

      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log('Error notif:', error);
    }
  };

  return (
    <Button
      type="submit"
      className="flex gap-1 bg-[#2196F3] hover:bg-[#1882d8]"
      onClick={createDocumentHandler}
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      Create
    </Button>
  );
};
