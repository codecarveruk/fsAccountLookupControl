import * as React from "react";
import { ComboBox, IComboBoxOption } from "@fluentui/react";

const options: IComboBoxOption[] = [
    { key: '1', text: 'Account One' },
    { key: '2', text: 'Account Two' },
    { key: '3', text: 'Account Three' }
];

const AccountLookup: React.FC = () => {
    return (
        <ComboBox
            label="Account"
            options={options}
            placeholder="Select an account..."
            style={{ minWidth: 250 }}
        />
    );
};

export default AccountLookup;
