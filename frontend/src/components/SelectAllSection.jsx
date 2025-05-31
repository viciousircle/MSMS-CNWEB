import React from 'react';
import { Section, SectionItem } from '@/components/Layouts/SectionLayout';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartState } from '@/hooks/cart/useCartState.hook';

const SelectAllSection = () => {
    const { allChecked, handleCheckAll } = useCartState();

    return (
        <div>
            <Section>
                <SectionItem
                    className="cursor-pointer"
                    onClick={() => handleCheckAll(!allChecked)}
                >
                    <Checkbox
                        className="size-6"
                        checked={allChecked}
                        onCheckedChange={handleCheckAll}
                    />
                    <div>Select All</div>
                </SectionItem>
            </Section>
        </div>
    );
};

export default SelectAllSection;
