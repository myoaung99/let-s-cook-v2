import {useRouter} from "next/router";
import {useGetAllIngredientQuery} from "@/features/Recipes/components/recipesService";
import {Ingredient} from "@/types";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {ScrollArea} from "@/components/ui/scroll-area";
import React from "react";
import {UseFormReturn} from "react-hook-form";

export const IngredientSelector = ({form}: { form:  UseFormReturn<{filterBy: string, ingredientSelector: string, countrySelector: string}, any, undefined> }) => {
    const router = useRouter();
    const {data: ingredientData} = useGetAllIngredientQuery({skip: router.isFallback})
    const ingredients = ingredientData?.meals as Array<Ingredient> | undefined
    const data = ingredients?.map(ingredient => ({label: ingredient.strIngredient, value: ingredient.strIngredient}))

    return <FormField
        control={form.control}
        name="ingredientSelector"
        render={({field}) => (
            <FormItem className="flex flex-col">
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-full md:w-[250px] justify-between",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value
                                    ? data?.find(
                                        (ingredient) => ingredient.value === field.value
                                    )?.label
                                    : "Select ingredient"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full md:w-[250px] p-0">
                        <Command>
                            <CommandInput placeholder="Search ingredient..."/>
                            <CommandEmpty>No ingredient found.</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className="sm:h-[300px] md:h-[500px] w-auto rounded-md p-4">
                                    {data?.map((ingredient) => (
                                        <CommandItem
                                            value={ingredient.label}
                                            key={ingredient.value}
                                            onSelect={() => {
                                                form.setValue("ingredientSelector", ingredient.value)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    ingredient.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {ingredient.label}
                                        </CommandItem>
                                    ))}
                                </ScrollArea>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <FormMessage/>
            </FormItem>
        )}
    />
}