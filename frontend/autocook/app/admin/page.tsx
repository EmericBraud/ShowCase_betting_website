'use client';
import { Select, SelectItem } from '@nextui-org/react';

export default async function Admin() {
    return (
        <div className="rounded bg-default-100 p-3">
            <h1 className="font-bold text-lg">Admin pannel</h1>
            <Select className="max-w-xs" label="Selectionnez un casino">
                <SelectItem>Casino 1</SelectItem>
            </Select>
        </div>
    );
}
