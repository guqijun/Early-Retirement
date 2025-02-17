"use client"

import { useState } from "react"
import { Input, Button } from "antd"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface YearlyBalance {
    age: number
    balance: number
}

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState<number>(28)
    const [officialRetirementAge, setOfficialRetirementAge] = useState<number>(60)
    const [retirementAge, setRetirementAge] = useState<number>(40)
    const [annualExpenses, setAnnualExpenses] = useState<number>(50000)
    const [annualRate, setAnnualRate] = useState<number>(0.01)
    const [surplusAssets, setSurplusAssets] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [annualSavingsNeeded, setAnnualSavingsNeeded] = useState<number | null>(null)
    const [yearlyBalances, setYearlyBalances] = useState<YearlyBalance[]>([])

    const calculateSavings = () => {
        const yearsUntilRetirement = retirementAge - currentAge
        const yearsInRetirement = officialRetirementAge - retirementAge

        // Calculate the total amount needed at retirement
        const totalNeeded =
            annualExpenses * ((1 - Math.pow(1 + annualRate, -yearsInRetirement)) / annualRate) + surplusAssets / (1 + annualRate)
        setTotal(totalNeeded)

        // Calculate the annual savings needed
        const savingsNeeded =
            totalNeeded / ((Math.pow(1 + annualRate, yearsUntilRetirement) - 1) / annualRate)

        setAnnualSavingsNeeded(savingsNeeded)

        // Calculate yearly balances from current age onwards
        const balances: YearlyBalance[] = []
        let currentBalance = 0
        for (let age = currentAge; age <= officialRetirementAge; age++) {
            if (age < retirementAge) {
                currentBalance = (currentBalance + savingsNeeded) * (1 + annualRate)
            } else {
                currentBalance = (currentBalance - annualExpenses) * (1 + annualRate)
            }
            balances.push({
                age: age,
                balance: currentBalance,
            })
        }
        setYearlyBalances(balances)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <div>Current Age</div>
                        <Input
                            id="currentAge"
                            type="number"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <div >Perfect Retirement Age</div>
                        <Input
                            id="retirementAge"
                            type="number"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <div >Official Retirement Age</div>
                        <Input
                            id="officialRetirementAge"
                            type="number"
                            value={officialRetirementAge}
                            onChange={(e) => setOfficialRetirementAge(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <div>Annual Expenses (￥)</div>
                        <Input
                            id="annualExpenses"
                            type="number"
                            value={annualExpenses}
                            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <div>Annual Rate</div>
                        <Input
                            id="annualRate"
                            type="number"
                            value={annualRate * 100}
                            onChange={(e) => setAnnualRate(Number(e.target.value) / 100)}
                        />
                    </div>
                    <div className="space-y-2">
                        <div>Surplus Assets (￥)</div>
                        <Input
                            id="surplusAssets"
                            type="number"
                            value={surplusAssets}
                            onChange={(e) => setSurplusAssets(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="text-sm text-gray-500">Just Calculate</div>
                <Button onClick={calculateSavings} className="w-full">
                    Calculate
                </Button>
                {annualSavingsNeeded !== null && (
                    <div className="mt-4 p-4 bg-green-100 rounded-md">
                        <p className="text-lg font-semibold">You need to save approximately:</p>
                        <p className="text-2xl font-bold text-green-700">￥{annualSavingsNeeded.toFixed(2)} per year</p>
                    </div>
                )}
                {total > 0 && (
                    <div className="mt-4 p-4 bg-green-100 rounded-md">
                        <p className="text-lg font-semibold">Total need:</p>
                        <p className="text-2xl font-bold text-green-700">￥{total.toFixed(2)}</p>
                    </div>
                )}
                {/* {yearlyBalances.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-2">Yearly Savings Balance</h3>
                                <div className="max-h-96 overflow-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Age</TableHead>
                                                <TableHead>Savings Balance</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {yearlyBalances.map((year) => (
                                                <TableRow key={year.age}>
                                                    <TableCell>{year.age}</TableCell>
                                                    <TableCell>${year.balance.toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )} */}
            </div>
        </div>
    )
}
