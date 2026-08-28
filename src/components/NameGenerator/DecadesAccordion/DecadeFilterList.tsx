import type { Decade } from '@/api/generated';
import FilterListItem from '@/components/NameGenerator/FilterListItem/FilterListItem';
import { useGivenNames, useGivenNamesActions } from '@/state/givenName/givenName.provider';
import List from '@mui/material/List';
import './DecadeFilterList.css';

type Props = {
  decades: Decade[];
};

export default ({ decades }: Props) => {
  const givenNameContext = useGivenNames();
  const { selectedDecadeIds } = givenNameContext.state;
  const { addSelectedDecadeIds, removeSelectedDecadeIds } = useGivenNamesActions();

  return (
    <List className="decade-filter-list themed-scrollbar">
      {selectedDecadeIds.length ? (
        <FilterListItem
          key="decades-unselect-all"
          index={-1}
          label="Unselect all"
          action={() => {
            removeSelectedDecadeIds(selectedDecadeIds);
          }}
          selected={true}
          variant="utility"
        />
      ) : null}
      {decades.map((decade, index) => {
        const { id, label } = decade;
        const selected = selectedDecadeIds.includes(id);

        return (
          <FilterListItem
            key={id}
            index={index}
            label={label}
            action={
              selected
                ? () => {
                    removeSelectedDecadeIds([id]);
                  }
                : () => {
                    addSelectedDecadeIds([id]);
                  }
            }
            selected={selected}
          />
        );
      })}
    </List>
  );
};
