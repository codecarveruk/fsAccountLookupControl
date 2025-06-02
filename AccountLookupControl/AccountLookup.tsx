import * as React from "react";
import { ComboBox, IComboBoxOption, IComboBox } from "@fluentui/react";

export interface AccountLookupProps {
    selectedKey?: string | number;
    onChange: (key: string | number | undefined) => void;
    context: ComponentFramework.Context<unknown>;
}

interface AccountEntity {
    accountid: string;
    name: string;
}

const AccountLookup: React.FC<AccountLookupProps> = ({ selectedKey, onChange, context }) => {
    const [options, setOptions] = React.useState<IComboBoxOption[]>([]);

    React.useEffect(() => {
        // Fetch accounts from Dataverse on mount
        const fetchAccounts = async () => {
            try {
                const result = await context.webAPI.retrieveMultipleRecords("account", "$select=accountid,name&$top=10");
                const opts = (result.entities as AccountEntity[]).map((a) => ({
                    key: a.accountid,
                    text: a.name
                }));
                setOptions(opts);
            } catch {
                setOptions([]);
            }
        };
        void fetchAccounts();
    }, [context]);

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
