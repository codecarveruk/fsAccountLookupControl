import * as React from "react";
import { ComboBox, IComboBoxOption, IComboBox } from "@fluentui/react";

const options: IComboBoxOption[] = [
    { key: '1', text: 'Account One' },
    { key: '2', text: 'Account Two' },
    { key: '3', text: 'Account Three' }
];

const AccountLookup: React.FC = () => {
    const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(undefined);

    const onChange = (_event: React.FormEvent<IComboBox>, option?: IComboBoxOption) => {
        setSelectedKey(option ? option.key : undefined);
    };

    return (
        <ComboBox
            label="Account"
            options={options}
            selectedKey={selectedKey}
            onChange={onChange}
            placeholder="Select an account..."
            style={{ minWidth: 250 }}
        />
    );
};

export default AccountLookup;
