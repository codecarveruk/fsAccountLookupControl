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
                const result = await context.webAPI.retrieveMultipleRecords("accounts", "$select=accountid,name&$top=10");
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

    const handleFilter = async (_event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
        const filter = value ? `&$filter=contains(name,'${value.replace(/'/g, "''")}')` : '';
        try {
            const result = await context.webAPI.retrieveMultipleRecords(
                "accounts",
                `$select=accountid,name&$top=10${filter}`
            );
            const opts = (result.entities as AccountEntity[]).map((a) => ({
                key: a.accountid,
                text: a.name
            }));
            setOptions(opts);
        } catch {
            setOptions([]);
        }
    };

    return (
        <ComboBox
            label="Account"
            options={options}
            selectedKey={selectedKey}
            onChange={handleChange}
            onInput={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => { void handleFilter(event, option, index, value); }}
            placeholder="Select an account..."
            style={{ minWidth: 250 }}
        />
    );
};

export default AccountLookup;
