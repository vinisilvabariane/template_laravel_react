<?php

namespace App\Http\Controllers;

use App\Models\WorkShift;
use Carbon\Carbon;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function resolveShift(?Carbon $referenceNow = null): array
    {
        $now = ($referenceNow ?? Carbon::now('America/Sao_Paulo'))->copy()->timezone('America/Sao_Paulo');
        $workShifts = WorkShift::query()
            ->select('shift', 'start_time', 'end_time')
            ->get();

        foreach ($workShifts as $workShift) {
            $resolvedShift = $this->matchWorkShift($workShift, $now);

            if ($resolvedShift !== null) {
                return $resolvedShift;
            }
        }

        return $this->resolveLegacyShift($now);
    }

    /**
     * @return array<int, array{name: string, start: Carbon, end: Carbon}>
     */
    public function resolveShiftsForDate(Carbon $referenceDate): array
    {
        $date = $referenceDate->copy()->timezone('America/Sao_Paulo')->startOfDay();
        $workShifts = WorkShift::query()
            ->select('shift', 'start_time', 'end_time')
            ->get();

        $resolvedShifts = $workShifts
            ->map(fn (WorkShift $workShift) => $this->buildShiftWindow($workShift, $date))
            ->filter()
            ->sortBy(fn (array $shift) => $shift['start']->timestamp)
            ->values();

        if ($resolvedShifts->isNotEmpty()) {
            return $resolvedShifts->all();
        }

        return $this->resolveLegacyShiftsForDate($date);
    }

    private function matchWorkShift(WorkShift $workShift, Carbon $now): ?array
    {
        foreach ([$now->copy(), $now->copy()->subDay()] as $baseDate) {
            $shiftWindow = $this->buildShiftWindow($workShift, $baseDate);

            if ($shiftWindow === null) {
                continue;
            }

            if ($now->betweenIncluded($shiftWindow['start'], $shiftWindow['end'])) {
                return [
                    'name' => $shiftWindow['name'],
                    'start' => $shiftWindow['start'],
                    'end' => $shiftWindow['end'],
                    'now' => $now,
                ];
            }
        }

        return null;
    }

    private function buildShiftWindow(WorkShift $workShift, Carbon $baseDate): ?array
    {
        $startTime = $this->normalizeTime((string) $workShift->start_time);
        $endTime = $this->normalizeTime((string) $workShift->end_time);

        if ($startTime === null || $endTime === null) {
            return null;
        }

        $shiftStart = $baseDate->copy()->setTimeFromTimeString($startTime);
        $shiftEnd = $baseDate->copy()->setTimeFromTimeString($endTime);

        if ($shiftEnd->lessThanOrEqualTo($shiftStart)) {
            $shiftEnd->addDay();
        }

        return [
            'name' => (string) $workShift->shift,
            'start' => $shiftStart,
            'end' => $shiftEnd,
        ];
    }

    private function normalizeTime(string $value): ?string
    {
        $trimmed = trim($value);

        if ($trimmed === '') {
            return null;
        }

        try {
            return Carbon::createFromFormat('H:i:s', $trimmed, 'America/Sao_Paulo')->format('H:i:s');
        } catch (\Throwable) {
        }

        try {
            return Carbon::createFromFormat('H:i', $trimmed, 'America/Sao_Paulo')->format('H:i:s');
        } catch (\Throwable) {
            return null;
        }
    }

    private function resolveLegacyShift(Carbon $now): array
    {
        $time = $now->format('H:i');

        if ($time >= '07:00' && $time < '17:30') {
            $shiftStart = $now->copy()->setTime(7, 0, 0);
            $shiftEnd = $now->copy()->setTime(17, 29, 0);
            $shiftName = '1º Turno';
        } elseif ($time >= '17:30') {
            $shiftStart = $now->copy()->setTime(17, 30, 0);
            $shiftEnd = $now->copy()->addDay()->setTime(3, 28, 0);
            $shiftName = '2º Turno';
        } else {
            $shiftStart = $now->copy()->subDay()->setTime(17, 30, 0);
            $shiftEnd = $now->copy()->setTime(3, 28, 0);
            $shiftName = '2º Turno';
        }

        $shiftId = WorkShift::where('shift', $shiftName)->value('id');

        return [
            'name' => $shiftName,
            'start' => $shiftStart,
            'end' => $shiftEnd,
            'now' => $now,
            'fk_shift' => $shiftId,
        ];
    }

    /**
     * @return array<int, array{name: string, start: Carbon, end: Carbon}>
     */
    private function resolveLegacyShiftsForDate(Carbon $date): array
    {
        return [
            [
                'name' => '1º Turno',
                'start' => $date->copy()->setTime(7, 0, 0),
                'end' => $date->copy()->setTime(17, 29, 0),
            ],
            [
                'name' => '2º Turno',
                'start' => $date->copy()->setTime(17, 30, 0),
                'end' => $date->copy()->addDay()->setTime(3, 28, 0),
            ],
        ];
    }
}
