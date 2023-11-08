import React from 'react';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';

const TextInput = ({ control, isLoading, name = '', label }: any) => {
    return (
        <>
            {label ? (
                <Label htmlFor={name} className="mb-1">
                    {label}
                </Label>
            ) : null}
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                id={name}
                                placeholder="your name"
                                {...field}
                                disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

export default TextInput;
