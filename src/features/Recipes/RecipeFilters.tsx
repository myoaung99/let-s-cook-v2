import React, {useState} from 'react';
import {useGetCategoriesQuery} from "@/features/Recipes/recipesService";
import {useRouter} from "next/router";
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Check, ChevronsUpDown, Search} from "lucide-react";
import {Category} from "@/types";
import {Input} from "@/components/ui/input"

interface RecipeCategoryComboBoxProps {
    getSearchCategory: (value: string) => void
}

const RecipeFilters = () => {
    const router = useRouter()
    const [filters, setFilters] = useState({
        ingredient: '',
        category: ''
    })
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setFilters(prevState => ({...prevState, ingredient: event.target.value}))
    }

    const getSearchCategory = (data: string) => {
        setFilters(prevState => ({...prevState, category: data}))
    }

    const handleOnSearch = ()=>{
        router.push(`/recipes?ingredient=${filters.ingredient}&category=${filters.category}`)
    }

    return (
        <section className='md:flex md:justify-end py-4'>
            <div className='space-y-2 md:space-y-0 md:flex md:items-center md:space-x-2'>
                <Input placeholder='search by main ingredient' className='md:w-[200px] placeholder:text-gray-400' onChange={handleInputChange}/>
                <div className='w-full md:w-[200px]'>
                    <RecipeCategoryComboBox getSearchCategory={getSearchCategory}/>
                </div>
                <div className='flex justify-end'>
                    <Button onClick={handleOnSearch}>Search</Button>
                </div>
            </div>
        </section>
    );
}

export default RecipeFilters;

const RecipeCategoryComboBox: React.FC<RecipeCategoryComboBoxProps> = ({getSearchCategory}) => {
    const router = useRouter();
    const {data, isLoading} = useGetCategoriesQuery({skip: router.isFallback})
    const categories = data?.categories as Array<Category>;
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const getSelectedCategoryLabel = () =>
        categories.find((category) => category.strCategory.toLowerCase() === value)?.strCategory

    const handleOnSelect = (currentValue: string) => {
        const selectedValue = currentValue === value ? "" : currentValue;
        setValue(selectedValue)
        getSearchCategory(selectedValue)
        setOpen(false)
    }

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full justify-between font-normal ${!!value ?'text-black': 'text-gray-400'}`}
            >
                {value
                    ? getSelectedCategoryLabel()
                    : "Select category..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
            <Command>
                <CommandInput placeholder="Search category..."/>
                <CommandEmpty>No framework found.</CommandEmpty>
                {isLoading
                    ? <CommandEmpty>loading..</CommandEmpty> : <CommandGroup>
                        {categories.map((category) => (
                            <CommandItem
                                key={category?.idCategory}
                                onSelect={handleOnSelect}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === category.strCategory.toLowerCase() ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {category.strCategory}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                }

            </Command>
        </PopoverContent>
    </Popover>
}
