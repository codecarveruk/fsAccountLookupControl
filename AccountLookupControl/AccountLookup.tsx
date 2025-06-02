import * as React from "react";
import { ComboBox, IComboBoxOption, IComboBox } from "@fluentui/react";

export interface AccountLookupProps {
    options: IComboBoxOption[];
    selectedKey?: string | number;
    onChange: (key: string | number | undefined) => void;
}

const AccountLookup: React.FC<AccountLookupProps> = ({ options, selectedKey, onChange }) => {
    const handleChange = (_event: React.FormEvent<IComboBox>, option?: IComboBoxOption) => {
        onChange(option ? option.key : undefined);
    };

    return (
        <ComboBox
            label="Account"
            options={options}
            selectedKey={selectedKey}
            onChange={handleChange}
            placeholder="Select an account..."
            style={{ minWidth: 250 }}
        />
    );
};

export default AccountLookup;
