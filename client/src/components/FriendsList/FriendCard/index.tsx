import React, { useMemo } from 'react';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { upperCaseFirstSymbol } from '../../../helpers/upperCaseFirstSymbol';

import './FriendCard.css';

type Props = {
  lastName: string;
  firstName: string;
};

export const FriendCard = (props: Props) => {
  const fullName = useMemo(
    () =>
      `${upperCaseFirstSymbol(props.firstName)} ${upperCaseFirstSymbol(
        props.lastName,
      )}`,
    [props.firstName, props.lastName],
  );

  return (
    <Card>
      <Meta
        avatar={<Avatar size="large" />}
        title={fullName}
        description={
          <Link to="/" className="friend-card__link">
            Написать сообщение
          </Link>
        }
      />
    </Card>
  );
};
