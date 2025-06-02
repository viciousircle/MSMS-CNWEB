import React from 'react';
import { Section, SectionItem } from '@/components/Layouts/SectionLayout';
import { Checkbox } from '@/components/ui/checkbox';

const SelectAllSection = ({ cart, checkedProducts, handleCheckAll }) => {
    const allChecked =
        cart.length > 0 &&
        cart.every(({ _id, stock }) => stock > 0 && checkedProducts[_id]);

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
