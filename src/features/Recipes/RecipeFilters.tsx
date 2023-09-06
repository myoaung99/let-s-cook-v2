import React, {useEffect} from 'react';
import {useGetAllCountriesQuery} from "@/features/Recipes/recipesService";
import {useRouter} from "next/router";
import {Button} from "@/components/ui/button"
import {Area} from "@/types";
import {Input} from "@/components/ui/input"
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Label} from "@/components/ui/label";

const formSchema = z.object({
    filterBy: z.string().min(1),
    ingredient: z.string().optional(),
    country: z.string().optional(),
})

const RecipeFilters = () => {
    const router = useRouter();
    const filter = router.query.filter as string;
    const value = router.query.value as string;

    const {data: countryData} = useGetAllCountriesQuery({skip: router.isFallback})
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {}
        }
    )
    const {watch} = form;
    const watchFilterBy = watch('filterBy')

    useEffect(() => {
        if (!!filter && !!value) {
            form.setValue('filterBy', filter)
            if (filter === 'Country') {
                form.setValue('country', value)
            }
        }
    }, [filter, value]);

    const countries = countryData?.meals as Array<Area> | undefined

    const handleOnSearch = (values: z.infer<typeof formSchema>) => {
        if (values.filterBy === 'Country') {
            router.push(`/recipes?filter=${values.filterBy}&value=${values.country}`)
        }

        if (values.filterBy === 'Ingredient') {
            router.push(`/recipes?filter=${values.filterBy}&value=${values.ingredient}`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSearch)}>
                <section className='md:flex md:justify-between md:items-end py-4 mb-5'>
                    <div className={'flex flex-col md:flex-row gap-2 md:items-center md:gap-4'}>
                        <Label htmlFor={'filterBy'}>Filter by</Label>
                        <div key={watchFilterBy} className='flex items-center gap-3 mb-3 md:mb-0'>
                            <FormField
                                control={form.control}
                                name="filterBy"
                                render={({field}) => (
                                    <FormItem className='w-full md:w-[200px]'>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={'Ingredient'}>{'Ingredient'}</SelectItem>
                                                    <SelectItem value={'Country'}>{'Country'}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                                }
                            />
                        </div>
                    </div>

                    <div className='space-y-3 md:space-y-0 md:flex md:items-center md:space-x-2'>
                        {watchFilterBy === 'Ingredient' ?
                            <FormField
                                control={form.control}
                                name="ingredient"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='search by main ingredient'
                                                   className='md:w-[200px] placeholder:text-gray-400'
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            : null}

                        {watchFilterBy === 'Country' ? <FormField
                            control={form.control}
                            name="country"
                            render={({field}) => (
                                <FormItem className='w-full md:w-[200px]'>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <ScrollArea
                                                    className="sm:h-[300px] md:h-[500px] w-auto rounded-md p-4 ">
                                                    {countries?.map(country => (
                                                        <SelectItem key={country.strArea}
                                                                    value={country.strArea}>{country.strArea}</SelectItem>
                                                    ))}
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> : null}


                        <div className='flex justify-end'>
                            <Button type='submit'>Search</Button>
                        </div>
                    </div>
                </section>
            </form>
        </Form>

    );
}

export default RecipeFilters;

// const RecipeCategoryComboBox: React.FC<RecipeCategoryComboBoxProps> = ({getSearchCategory}) => {
//     const router = useRouter();
//     const categoryQuery = router.query?.value as string | undefined
//
//
//     const {data, isLoading} = useGetCategoriesQuery({skip: router.isFallback})
//     const categories = data?.categories as Array<Category>;
//     const [open, setOpen] = React.useState(false)
//     const [value, setValue] = React.useState('')
//
//     useEffect(() => {
//         if (!!categoryQuery) {
//             setValue(categoryQuery.toLowerCase())
//         }
//     }, [categoryQuery])
//
//     const getSelectedCategoryLabel = () =>
//         categories?.find((category) => category.strCategory.toLowerCase() === value)?.strCategory
//
//     const handleOnSelect = (currentValue: string) => {
//         const selectedValue = currentValue === value ? "" : currentValue;
//         setValue(selectedValue)
//         getSearchCategory(selectedValue)
//         setOpen(false)
//     }
//
//     return <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//             <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open}
//                 className={`w-full justify-between font-normal ${!!value ? 'text-black' : 'text-gray-400'}`}
//             >
//                 {value
//                     ? getSelectedCategoryLabel()
//                     : "Select category..."}
//                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
//             </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0">
//             <Command>
//                 <CommandInput placeholder="Search category..."/>
//                 <CommandEmpty>No framework found.</CommandEmpty>
//                 {isLoading
//                     ? <CommandEmpty>loading..</CommandEmpty> : <CommandGroup>
//                         {categories?.map((category) => (
//                             <CommandItem
//                                 key={category?.idCategory}
//                                 onSelect={handleOnSelect}
//                             >
//                                 <Check
//                                     className={cn(
//                                         "mr-2 h-4 w-4",
//                                         value === category.strCategory.toLowerCase() ? "opacity-100" : "opacity-0"
//                                     )}
//                                 />
//                                 {category.strCategory}
//                             </CommandItem>
//                         ))}
//                     </CommandGroup>
//                 }
//
//             </Command>
//         </PopoverContent>
//     </Popover>
// }
