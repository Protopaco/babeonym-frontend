import Typography from '@mui/material/Typography';
import { LayoutGroup, motion } from 'motion/react';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import type { GivenName } from '@/api/generated';
import ApprovedGivenNameChip from '@/components/Shared/ApprovedGivenNameChip/ApprovedGivenNameChip';

type Props = {
  approvedGivenNames: GivenName[];
};

export default ({ approvedGivenNames }: Props) => {
  const rankedNames = useMemo(() => {
    return [...approvedGivenNames].sort((left, right) => right.rating - left.rating);
  }, [approvedGivenNames]);
  const rankingRowCount = Math.ceil(rankedNames.length / 3);

  return (
    <section id="compare-name-rankings" aria-label="Name rankings">
      <Typography id="compare-name-rankings-title">Rankings</Typography>
      <LayoutGroup>
        <ol
          id="compare-name-rankings-list"
          style={{ '--compare-name-ranking-row-count': rankingRowCount } as CSSProperties}
        >
          {rankedNames.map((name, index) => (
            <motion.li
              className="compare-name-ranking"
              key={name.givenCustomNameBridgeId}
              layout="position"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            >
              <Typography className="compare-name-ranking-position">{index + 1}</Typography>
              <ApprovedGivenNameChip approvedGivenName={name} />
            </motion.li>
          ))}
        </ol>
      </LayoutGroup>
    </section>
  );
};
