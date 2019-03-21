import * as React from 'react';
import { format } from 'date-fns';
import { Game } from '@/models';
import Image from '@/components/Image';
import { Side, Info, InfoTitle, InfoList, InfoItem } from './style';

const DetailSide: React.SFC<{ game: Game }> = ({ game }) => (
  <Side>
    <Image imageKey={game.image || ''} icon="gamepad" />
    <Info>
      <InfoTitle>More Info</InfoTitle>
      <InfoList>
        <InfoItem>
          <p>Developed by: </p>
          <span>{game.developer}</span>
        </InfoItem>
        <InfoItem>
          <p>Published by: </p>
          <span>{game.publisher}</span>
        </InfoItem>
        <InfoItem>
          <p>Release at: </p>
          <span>{format(game.releaseAt, 'YYYY-MM-DD')}</span>
        </InfoItem>
      </InfoList>
    </Info>
  </Side>
);

export default DetailSide;
